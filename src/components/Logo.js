import { chakra, useColorModeValue } from "@chakra-ui/react";

export const Logo = (props) => (
  <chakra.svg
    color={useColorModeValue("blue.500", "blue.200")}
    width="120"
    height="35"
    viewBox="0 0 120 35"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.2674 23.2758C24.5642 23.5705 25.2463 23.5284 26.1979 23.0821C27.6379 22.4084 28.5305 20.7158 28.2695 19.141C28.0084 17.5831 26.8716 16.3789 25.3221 16.0337C24.6821 15.8905 24.3032 15.9074 23.2674 16.1347C23.0316 16.1853 23.0316 16.1853 23.0316 15.7474C23.0316 15.3095 23.0316 15.3095 23.2674 15.36C24.1684 15.5621 24.5726 15.5958 25.1032 15.5116C27.1579 15.1747 28.581 13.2716 28.2779 11.2842C28.0253 9.67578 26.8968 8.47157 25.3221 8.11789C23.2674 7.66315 21.1874 9.09473 20.8421 11.2C20.7831 11.5621 20.7579 14.2147 20.7747 19.1916L20.8 26.6442L21.8947 27.301L22.9895 27.9579L23.0147 25.5916L23.0316 23.2253L23.2674 23.2758ZM17.8358 23.2421C18.0968 23.141 18.4421 22.9726 18.6105 22.8547L18.9221 22.6442L19.6295 23.0653L20.3368 23.4863V21.4063C20.3368 19.8316 20.3031 19.2 20.2105 18.8379C19.8147 17.3305 18.661 16.2526 17.1368 15.9831C15.7474 15.7389 14.0968 16.5137 13.3305 17.7684C12.6316 18.9305 12.6484 20.5558 13.3895 21.7179C13.8863 22.5179 14.8884 23.2168 15.7895 23.4105C16.3284 23.52 17.2968 23.4442 17.8358 23.2421ZM11.9326 11.1831L11.9579 6.86315L13.7937 6.83789L15.621 6.82104V5.38946V3.95789H10.3579H5.09473V5.38946V6.82104L6.93052 6.83789L8.75788 6.86315L8.78315 10.2737L8.79999 13.6842L10.2989 14.5853C11.1158 15.0821 11.8147 15.4863 11.8484 15.4947C11.8821 15.4947 11.9242 13.5495 11.9326 11.1831ZM17.8021 15.2337C18.0547 15.1495 18.4084 14.981 18.5937 14.8547L18.9221 14.6358L19.5874 15.0231C19.9495 15.2337 20.2695 15.4105 20.2947 15.4105C20.3789 15.4105 20.3368 11.3684 20.2442 10.9305C19.9495 9.5242 18.7789 8.32841 17.381 8.00841C15.3095 7.52841 13.1537 9.02736 12.8505 11.1495C12.5137 13.5158 14.5179 15.6379 16.8842 15.4274C17.1368 15.4105 17.5495 15.3179 17.8021 15.2337Z"
      fill="#002733"
    />
    <path
      d="M24 21.0189C23.8568 20.96 23.6211 20.7747 23.4779 20.6063C22.5937 19.5958 23.6126 17.9874 24.9179 18.3579C25.3221 18.4674 25.7432 18.8463 25.8863 19.2253C26.3158 20.3453 25.0947 21.4989 24 21.0189Z"
      fill="white"
    />
    <path
      d="M24 13.1032C23.8568 13.0442 23.6211 12.859 23.4779 12.6905C22.5937 11.68 23.6126 10.0716 24.9179 10.4421C25.3221 10.5516 25.7432 10.9305 25.8863 11.3095C26.3158 12.4295 25.0947 13.5832 24 13.1032Z"
      fill="white"
    />
    <path
      d="M16 21.0189C15.4105 20.7579 15.0316 19.9916 15.2 19.3684C15.4695 18.3579 16.6821 17.9621 17.4484 18.6358C18.0042 19.1242 18.1221 19.7474 17.7852 20.3789C17.4484 21.0105 16.64 21.2968 16 21.0189Z"
      fill="white"
    />
    <path
      d="M15.9915 12.9769C15.1157 12.5811 14.8884 11.52 15.5115 10.7705C16.1431 10.0295 17.322 10.1642 17.7852 11.0316C18.1052 11.6379 18.021 12.1937 17.5326 12.699C17.1115 13.1369 16.5642 13.2379 15.9915 12.9769Z"
      fill="white"
    />
    <path
      d="M3.64537 19.1656C11.6631 21.8947 14.6526 23.621 23.9158 30.2737C13.0105 25.1789 10.7368 24.0421 3.64537 19.1656Z"
      fill="#FFB42C"
    />
    <path
      d="M45.1523 7.9375V25H41.6484V7.9375H45.1523ZM50.4023 7.9375V10.6914H36.4805V7.9375H50.4023ZM59.2781 10.8555L54.6375 25H50.8992L57.2391 7.9375H59.618L59.2781 10.8555ZM63.1336 25L58.4812 10.8555L58.1062 7.9375H60.5086L66.8836 25H63.1336ZM62.9227 18.6484V21.4023H53.9109V18.6484H62.9227ZM76.3102 18.918H71.9625V16.1758H76.3102C76.982 16.1758 77.5289 16.0664 77.9508 15.8477C78.3727 15.6211 78.6813 15.3086 78.8766 14.9102C79.0719 14.5117 79.1695 14.0625 79.1695 13.5625C79.1695 13.0547 79.0719 12.582 78.8766 12.1445C78.6813 11.707 78.3727 11.3555 77.9508 11.0898C77.5289 10.8242 76.982 10.6914 76.3102 10.6914H73.1813V25H69.6656V7.9375H76.3102C77.6461 7.9375 78.7906 8.17969 79.7438 8.66406C80.7047 9.14062 81.4391 9.80078 81.9469 10.6445C82.4547 11.4883 82.7086 12.4531 82.7086 13.5391C82.7086 14.6406 82.4547 15.5938 81.9469 16.3984C81.4391 17.2031 80.7047 17.8242 79.7438 18.2617C78.7906 18.6992 77.6461 18.918 76.3102 18.918ZM91.3266 10.8555L86.6859 25H82.9477L89.2875 7.9375H91.6664L91.3266 10.8555ZM95.182 25L90.5297 10.8555L90.1547 7.9375H92.557L98.932 25H95.182ZM94.9711 18.6484V21.4023H85.9594V18.6484H94.9711ZM108.359 18.918H104.011V16.1758H108.359C109.03 16.1758 109.577 16.0664 109.999 15.8477C110.421 15.6211 110.73 15.3086 110.925 14.9102C111.12 14.5117 111.218 14.0625 111.218 13.5625C111.218 13.0547 111.12 12.582 110.925 12.1445C110.73 11.707 110.421 11.3555 109.999 11.0898C109.577 10.8242 109.03 10.6914 108.359 10.6914H105.23V25H101.714V7.9375H108.359C109.695 7.9375 110.839 8.17969 111.792 8.66406C112.753 9.14062 113.488 9.80078 113.995 10.6445C114.503 11.4883 114.757 12.4531 114.757 13.5391C114.757 14.6406 114.503 15.5938 113.995 16.3984C113.488 17.2031 112.753 17.8242 111.792 18.2617C110.839 18.6992 109.695 18.918 108.359 18.918Z"
      fill="#EE8D1B"
    />
  </chakra.svg>
);
