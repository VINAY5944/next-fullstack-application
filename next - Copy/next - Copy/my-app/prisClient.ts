import { Prisma, PrismaClient } from "@prisma/client";

const resultModifyLogicExtention = Prisma.defineExtension({
  name: "resultModification",
  result: {
    post: {
      profileImageUrl: {
        needs: { image: true },
        compute(post) {
          if (!post.image) return "";
          return `public/assets/${post.image}}`;
        },
      },
    },
  },
});
module.exports = resultModifyLogicExtention;
