import { PrismaClient } from '@prisma/client'
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

const resolvers = {
  Query: {

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
    }
  },
};

export default resolvers;