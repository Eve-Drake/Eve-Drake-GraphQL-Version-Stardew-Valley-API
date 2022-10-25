import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Charecter {
    id: number,
    name: String,
    marriage: Boolean,
    topGifts: [String],
    address: String,
    birthday: String
  }

  type Query {
    charecters: [Charecter]
  }
`;

const charecters = [
{id: 0, name : 'Alex', marriage: true, topGifts: ['Complete Breakfast', 'Salmon Dinner', 'Pearl'], address: '1 River Road', birthday: 'Summer: 13'},
{id: 1, name : 'Elliot', marriage: true, topGifts: ['Lobster', 'Duck Feather', 'Squid Ink'], address: 'Elliot\'s Cabin', birthday: 'Fall: 5'},
{id: 2, name : 'Harvey', marriage: true, topGifts: ['Coffee', 'Truffle Oil', 'Wine'], address: 'Medical Clinic', birthday: 'Winter: 14'},
{id: 3, name : 'Sam', marriage: true, topGifts: ['Cactus Fruit', 'Maple Bar', 'Pizza'], address: '1 Willow Lane', birthday: 'Summer: 17'},
{id: 4, name : 'Sebastian', marriage: true, topGifts: ['Frozen Tear', 'Sashimi', 'Obsidian'], address: '24 Mountain Road', birthday: 'Winter: 10'},
{id: 5, name : 'Shane', marriage: true, topGifts: ['Beer', 'Pizza', 'Hot Pepper'], address: 'Marnies Ranch', birthday: 'Spring: 20'},
{id: 6, name : 'Abigail', marriage: true, topGifts: ['Amathyst', 'Pumpkin', 'Pufferfish'], address: 'Pierres General Store', birthday: 'Fall 13'},
{id: 7, name : 'Emily', marriage: true, topGifts: ['Cloth', 'Jade', 'Wool'], address: '2 Willow Lane', birthday: 'Spring 27'},
{id: 8, name : 'Haley', marriage: true, topGifts: ['Pink Cake', 'Sunflower', 'Fruit Salad'], address: '2 Willow Lane', birthday: 'Spring 14'},
{id: 9, name : 'Leah', marriage: true, topGifts: ['Salad', 'Wine', 'Truffle'], address: 'Leahs Cottage', birthday: 'Winter 23'},
{id: 10, name : 'Maru', marriage: true, topGifts: ['Battery Pack', 'Diamond', 'Gold Bar'], address: '24 Mountain Road', birthday: 'Summer 10'},
{id: 11, name : 'Penny', marriage: true, topGifts: ['Emerald', 'Poppy', 'Melon'], address: 'Trailer', birthday: 'Fall 2'},
{id: 12, name : 'Caroline', marriage: false, topGifts: ['Green Tea', 'Summer Spangle', 'Fish Taco'], address: 'Pierres General Store', birthday: 'Winter 7'},
{id: 13, name : 'Clint', marriage: false, topGifts: ['Emerald', 'Gold Bar', 'Ruby'], address: 'Blacksmith', birthday: 'Winter 26'},
{id: 14, name : 'Demitrius', marriage: false, topGifts: ['Strawberry', 'Bean Hotpot', 'Ice Cream'], address: '24 Mountain Road', birthday: 'Summer 19'},
{id: 15, name : 'Dwarf', marriage: false, topGifts: ['Emerald', 'Jade', 'Ruby'], address: 'Eastern Cave', birthday: 'Summer 22'},
{id: 16, name : 'Evelyn', marriage: false, topGifts: ['Beet', 'Tulip', 'Diamond'], address: '1 River Road', birthday: 'Winter 20'},
{id: 17, name : 'George', marriage: false, topGifts: ['Leek', 'Fried Mushroom', 'Pearl'], address: '1 River Road', birthday: 'Fall 24'},
{id: 18, name : 'Gus', marriage: false, topGifts: ['Orange', 'Escargot', 'Fish Taco'], address: 'The Stardrop Saloon', birthday: 'Summer 8'},
{id: 19, name : 'Jas', marriage: false, topGifts: ['Fairy Rose', 'Plum Pudding', 'Pink Cake'], address: 'Marnies Ranch', birthday: 'Summer 4'},
{id: 20, name : 'Jodi', marriage: false, topGifts: ['Fried Eel', 'Chocolate Cake', 'Diamond'], address: '1 Willow Lane', birthday: 'Fall 11'},
{id: 21, name : 'Kent', marriage: false, topGifts: ['Pearl', 'Fiddlehead Risotto', 'Roasted Hazelnuts'], address: '1 Willow Lane', birthday: 'Spring 4'},
{id: 22, name : 'Krobus', marriage: false, topGifts: ['Diamond', 'Void Egg', 'Pumpkin'], address: 'The Sewers', birthday: 'Winter 1'},
{id: 23, name : 'Leo', marriage: false, topGifts: ['Poi', 'Duck Feather', 'Mango'], address: 'Ginger Island Forest', birthday: 'Summer 26'},
{id: 24, name : 'Lewis', marriage: false, topGifts: ['Hot Pepper', 'Green Tea', 'Glazed Yam'], address: 'Mayors Manor', birthday: 'Spring 7'},
{id: 25, name : 'Linus', marriage: false, topGifts: ['Yam', 'Coconut', 'Blueberry Tart'], address: 'Tent', birthday: 'Winter 3'},
{id: 26, name : 'Marnie', marriage: false, topGifts: ['Pink Cake', 'Pumpkin Pie', 'Diamond'], address: 'Cindersnap Forest', birthday: 'Fall 18'},
{id: 27, name : 'Pam', marriage: false, topGifts: ['Beer', 'Mead', 'Parsnip'], address: 'Trailer', birthday: 'Spring 18'},
{id: 28, name : 'Pierre', marriage: false, topGifts: ['Fried Calamari', 'Pearl', 'Rabbits Foot'], address: 'Pierres General Store', birthday: 'Spring 26'},
{id: 29, name : 'Robin', marriage: false, topGifts: ['Goat Cheese', 'Peach', 'Spaghetti'], address: '24 Mountain Road', birthday: 'Fall 21'},
{id: 30, name : 'Sandy', marriage: false, topGifts: ['Crocus', 'Daffodil', 'Sweet Pea'], address: 'Oasis', birthday: 'Fall 15'},
{id: 31, name : 'Vincent', marriage: false, topGifts: ['Grape', 'Snail', 'Pink Cake'], address: '1 Willow Lane', birthday: 'Spring 10'},
{id: 32, name : 'Willy', marriage: false, topGifts: ['Diamond', 'Mead', 'Octopus'], address: 'Fish Shop', birthday: 'Summer 24'},
{id: 33, name : 'Wizard', marriage: false, topGifts: ['Purple Mushroom', 'Solar Essence', 'Void Essence'], address: 'Wizards Tower', birthday: 'Winter 17'},
{id: 34, name : 'Birdie', marriage: false, address: 'Ginder Island Beach Hut'},
{id: 35, name : 'Bouncer', marriage: false, address: 'Oasis'},
{id: 36, name : 'Gil', marriage: false, address: 'The Adventures Guild',},
{id: 37, name : 'Governor', marriage: false},
{id: 38, name : 'Gunther', marriage: false, address: 'Museum'},
{id: 39, name : 'Henchman', marriage: false, topGifts: 'Void Mayonnaise', address: 'Witches Swamp'},
{id: 40, name : 'Morris', marriage: false, address: 'JojaMart'},
{id: 41, name : 'Marlon', marriage: false, address: 'The Adventures Guild',},
{id: 42, name : 'Mr. Qi', marriage: false, address: 'Casino or Walnut Room',},
{id: 43, name : 'Proffessor Snail', marriage: false, address: 'Island Field Office',},
]

const resolvers = {
    Query: {
      books: () => books,
    },
  };


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`Server ready at: ${url}`);