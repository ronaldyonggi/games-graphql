import db from './_db';

export const resolvers = {
  Query: {
    games: () => db.games,
    game: (_, args) => db.games.find((g) => g.id === args.id),
    reviews: () => db.reviews,
    review: (_, args) => db.reviews.find((r) => r.id === args.id),
    authors: () => db.authors,
    author: (_, args) => db.authors.find((a) => a.id === args.id),
  },
  Game: {
    // Here parent is the game, thus parent.id is the game.id
    reviews: (parent) => db.reviews.filter((r) => r.game_id === parent.id),
  },
  Author: {
    reviews: (parent) => db.reviews.filter((r) => r.author_id === parent.id),
  },
  Review: {
    author: (parent) => db.authors.find((a) => a.id === parent.author_id),
    game: (parent) => db.games.find((g) => g.id === parent.game_id),
  },
  Mutation: {
    deleteGame: (_, args) => {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    addGame: (_, args) => {
      const newGame = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(newGame)
      return newGame
    },
    updateGame: (_, args) => {
      db.games = db.games.map(g => g.id === args.id ? {...g, ...args.edits} : g)
    }
  },
};
