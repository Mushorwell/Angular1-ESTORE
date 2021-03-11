import { Advert } from './../app/advert/advert';

export class AdvertData {

  static adverts: Advert[] = [
    {
      id: 1,
      userId: 1,
      name: 'Age of Empires Gold Edition',
      tags: ['Strategy Game', 'Computer Game', 'Classic'],
      dateAdded: new Date(2020, 12, 15, 18, 35, 0),
      price: 125,
      description: 'A strategy classic for the PC. Gold Edition, disks in great condition and all original booklets available.'
    },
    {
      id: 2,
      userId: 1,
      name: 'Burnout Paradise Ultimate Edition',
      tags: ['Arcade Racing Game', 'Playstation 3'],
      dateAdded: new Date(2020, 12, 15, 18, 37, 0),
      price: 150,
      description: 'Classic arcade racing game for the playstation 3, quality graphics and great fun.'
    },
    {
      id: 3,
      userId: 2,
      name: '2010 World Cup Model Soccer Ball',
      tags: ['Sports', 'Soccer'],
      dateAdded: new Date(2020, 8, 23, 18, 15, 22),
      price: 299.99,
      description: '2010 World Cup Model Soccer Ball - for your own fun. '
    },
    {
      id: 4,
      userId: 2,
      name: 'Wimbledon Class Tennis Kit',
      tags: ['Sport', 'Tennis', 'Full kit'],
      dateAdded: new Date(2020, 7, 19, 12, 15, 10),
      price: 659.89,
      description: 'A full tennis kit including 2 tennis rackets, a net, and a pack of 3 tennis balls.'
    },
    {
      id: 5,
      userId: 2,
      name: 'Skateboard Avengers Graphic',
      tags: ['Sport', 'Skateboarding'],
      dateAdded: new Date(2020, 12, 2, 15, 2, 0),
      price: 799.99,
      description: 'Shred the streets with an Avengers themed skateboard, medium soft rubber wheels and top class trucks.'
    },
    {
      id: 6,
      userId: 4,
      name: 'Attack on Titan Season 1-3 Definitive Edition Boxset',
      tags: ['Entertainment', 'Anime'],
      dateAdded: new Date(2020, 2, 16, 10, 52, 0),
      price: 1199.95,
      description: 'Watch the complete seasons 1 to 3 of Attack on Titans on HD BluRay discs, in great quality and condition.'
    },
    {
      id: 7,
      userId: 3,
      name: 'My Hero Academia Seasons 1-3',
      tags: ['Anime', 'Action Superhero'],
      dateAdded: new Date(2021, 3, 8, 9, 16, 0),
      price: 369.95,
      description: 'Get yourself 3 complete seasons of the popular My Hero Academia anime series.'
    },
    {
      id: 8,
      userId: 3,
      name: 'Trek Mountain Bike',
      tags: ['Outdoors', 'Sport'],
      dateAdded: new Date(2021, 1, 29, 7, 22, 50),
      price: 3199.87,
      description: '27 gear mountain bike in great condition with attached gyroscopic torches on both front and rear guards.'
    },
    {
      id: 9,
      userId: 5,
      name: 'Samsung Galaxy AO2',
      tags: ['Electronics', 'Phone', 'Mobile'],
      dateAdded: new Date(2021, 3, 5, 5, 42, 15),
      price: 6547.29,
      description: '32GB/64GB storage, microSDXC, 6.5", 13MP Camera, 3Gb RAM, 500mAh'
    },
    {
      id: 10,
      userId: 7,
      name: 'Portable Pull-up Bar',
      tags: ['Fitness'],
      dateAdded: new Date(2020, 11, 8, 12, 48, 23),
      price: 125,
      description: 'Easy to assemble pull-up bar, useful to attach on door ways and can be also used on the ground for push ups.'
    },
  ];

}
