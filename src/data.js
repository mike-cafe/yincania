export const barQuiz = {
  barId: "bbbb",
  rutaId: "1",
  question: "¿Cuando se fundó este bar?",
  answers: [
    "Nunca se ha fundido",
    "Ninguna de las anteriores.",
    "Todas las anteriores.",
    "En 1984.",
  ],
  tip: "¡Recuerda! puedes buscar pistas en el bar o preguntarle a los camareros",
  correct: 4,
  penalty: 10,
};

export const shields = [
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
    name: "one",
  },
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldThree.png?alt=media&token=b4e3f05d-8dbc-48da-977f-1edaeb0bcbf0",
    name: "two",
  },
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldOne.png?alt=media&token=b0d82e4c-30aa-46a2-8289-cb1c818df3f6",
    name: "three",
  },
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldFour.png?alt=media&token=cd50cab2-4a67-40ca-8a66-92062943c390",
    name: "five",
  },
];

export const rutaDetail = {
  id: 1,
  cover:
    "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f",
  location: "Cabo de Palos, Murcia",
  title: "La Épica Marítima",
  date: "24 de junio de 2022",
  teamCounter: 150,
  barCounter: 7,
  tapasCounter: 7,
  finalBar: {
    name: "La Cueva del Pirata",
    address: "Calle Ida, 12",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    isLast: true,
  },
};

export const rutasList = [
  {
    id: 0,
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%20II%2070pp.png?alt=media&token=d4ffb88a-ecdf-4a93-93a0-bbf4a754977b",
    location: "Olavide, Madrid",
    title: "Hola Verano",
    date: "15 de mayo del 2022",
    status: "finished",
    teamCounter: 20,
    barCounter: 5,
    tapasCounter: 5,
    finalBar: {
      name: "El Solsticio",
      address: "Calle Equinocio, 25",
      cover:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
      isLast: true,
    },
  },
  {
    id: 1,
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f",
    location: "Cabo de Palos, Murcia",
    title: "La Épica Marítima",
    date: "24 de junio de 2022",
    status: "started",
    teamCounter: 150,
    barCounter: 7,
    tapasCounter: 7,
    finalBar: {
      name: "La Cueva del Pirata",
      address: "Calle Ida, 12",
      cover:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
      isLast: true,
    },
  },
  {
    id: 2,
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%20II%2070pp.png?alt=media&token=d4ffb88a-ecdf-4a93-93a0-bbf4a754977b",
    location: "La Latina, Madrid",
    title: "Operación Retorno",
    date: "4 de septiembre del 2022",
    status: "open",
    teamCounter: 5,
    barCounter: 7,
    tapasCounter: 7,
    finalBar: {
      name: "La Última Tasca",
      address: "Calle Jamón, 23",
      cover:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
      isLast: true,
    },
  },
];

export const teamDetail = {
  name: "Idiotas de Alcobendas",
  memberCounter: 12,
  shield:
    "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
  started: "10000000000",
  warcry: "La única solución a un plan absurdo es un plan aún más absurdo.",
  members: ["JC", "Maroto", "Vitti", "Jacob", "Capi", "Mari", "Quasi"],
};

export const barList = [
  {
    id: "a",
    name: "Cabo de Palos 1",
    address: "Calle Murcia, 1",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    time: "22",
    playable: false,
    isLast: false,
  },
  {
    id: "a",
    name: "Cabo de Palos 2",
    address: "Calle Murcia, 2",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    time: "22",
    playable: false,
    isLast: false,
  },
  {
    id: "jBHjYraRhUcXUPVCCU4p",
    name: "Cabo de Palos 3",
    address: "Calle Murcia, 3",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    time: "22",
    playable: true,
    isLast: false,
  },
  {
    id: "a",
    name: "Cabo de Palos 4",
    address: "Calle Murcia, 4",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    time: "22",
    playable: false,
    isLast: false,
  },
  {
    id: "a",
    name: "Cabo de Palos 5",
    address: "Calle Murcia, 5",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    time: "22",
    playable: false,
    isLast: false,
  },
  {
    id: "a",
    name: "Cabo de Palos 6",
    address: "Calle Murcia, 6",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    time: "22",
    playable: false,
    isLast: false,
  },
  {
    id: "a",
    name: "Cueva del Pirata",
    address: "Calle Murcia, 7",
    cover:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6",
    time: "22",
    playable: false,
    isLast: true,
  },
];

export const steps = [
  {
    title: "Etapa 1",
    description: "Bar Jugado 1",
    playable: false,
    time: "22'",
  },
  {
    title: "Etapa 2",
    description: "Bar Jugado 2",
    playable: false,
    time: "22'",
  },
  {
    title: "Etapa 3",
    description: "Bar en Juego 3",
    playable: false,
    time: "22'",
  },
  {
    title: "Etapa 4",
    description: "Bar Obfuscado 4",
    playable: true,
    time: "22'",
  },
  {
    title: "Etapa 5",
    description: "Bar Obfuscado 5",
    playable: false,
    time: "22'",
  },
  {
    title: "Etapa 6",
    description: "Bar Obfuscado 6",
    playable: false,
    time: "22'",
  },
  {
    title: "Bar Final",
    description: "Taberna del Destino",
    playable: false,
    time: "22'",
  },
];

export const clasification = [
  {
    id: 1,
    name: "Impresentables I",
    shieldUrl:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
    time: "00:01",
    warcry: "Derrota tras derrota hasta la victoria final.",
  },
  {
    id: 2,
    name: "Impresentables II",
    shieldUrl:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
    time: "00:02",
    warcry: "Derrota tras derrota hasta la victoria final.",
  },
  {
    id: 3,
    name: "Impresentables III",
    shieldUrl:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
    time: "00:04",
    warcry: "Derrota tras derrota hasta la victoria final.",
  },
  {
    id: 4,
    name: "Impresentables IV",
    shieldUrl:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
    warcry: "Derrota tras derrota hasta la victoria final.",
    time: "00:06",
  },
  {
    id: 5,
    name: "Impresentables V",
    shieldUrl:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
    warcry: "Derrota tras derrota hasta la victoria final.",
    time: "00:06",
  },
];

export const userProfile = {
  name: "Eduardo Manos Tijeras",
  username: "tijeras",
  email: "thedude@gmail.com",
  avatar: "Quesiko",
};

export const avatarOptions = [
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/AvatarOne.png?alt=media&token=7c7160cb-54bd-4fca-b16f-61cecab6c422",
    name: "Tomatú",
  },
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CheeseAvatar.png?alt=media&token=6a2f1a00-4532-480e-9734-0953791fcba3",
    name: "Quesiko",
  },
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/AvatarThree.png?alt=media&token=508a18c9-a6c9-4eeb-9160-d8bf6aa7f01a",
    name: "Totopo",
  },
  {
    decor:
      "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/AvatarTwo.png?alt=media&token=b578c9cf-00f0-4dad-a11e-15f7c17d9449",
    name: "Almóndigo",
  },
];
