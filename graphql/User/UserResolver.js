exports.resolver = {
  Query: {
    getUsers: () => {
      const users = [
        {
          userName: 'Raksh',
          email: 'raksh@gmail.com',
        },
        {
          userName: 'sam',
          email: 'sam@gmail.com',
        },
      ];
      return users;
    },
  },
};
