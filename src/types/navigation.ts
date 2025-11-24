import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Transfer: undefined;
  Profile: undefined;
  ProductUpload: undefined;
  ProfileImage: undefined;
  Login: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type TransferScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;