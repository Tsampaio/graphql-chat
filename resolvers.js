import { PrismaClient } from '@prisma/client'
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()
console.log(process.env.JWT_SECRET);
const resolvers = {
  Query: {
    users: async (_, args, { userId }) => {

      if (!userId) {
        throw new ForbiddenError('You must be logged in');
      }

      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          id: {
            not: userId,
          }
        }
      });
      return users;
    }
  },
  Mutation: {
    signupUser: async (_, { input }, { models }) => {
      const { firstName, lastName, email, password } = input;

      const userExists = await prisma.user.findUnique({
        where: {
          email,
        }
      });

      if (userExists) {
        throw new AuthenticationError('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          ...input,
          password: hashedPassword,
        }
      });
      return user;
    },
    signinUser: async (_, { input }) => {
      const userExists = await prisma.user.findUnique({
        where: {
          email: input.email,
        }
      });
      if (!userExists) {
        throw new AuthenticationError('Email or password are not correct');
      }

      const matchPasswords = await bcrypt.compare(input.password, userExists.password);
      if (!matchPasswords) {
        throw new AuthenticationError('Email or password are not correct');
      }
      const token = await jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return {
        token
      }
    }
  }
};

export default resolvers;