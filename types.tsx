/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from '@supabase/supabase-js';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface ExpoImageResult {
  cancelled: boolean;
  height: number;
  width: number;
  uri: string;
};

export interface AppUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export interface LostItem {
  id: string;
  title: string;
  location: string;
  localImage: string | null;
  onlineImage: string;
  finderID: string;
  finderNumber: string;
  datePosted: string;
  isClaimed: boolean;
  claimDate: string | null;
  claimerID: string | null;
  isDeleted: boolean;
};

export interface Notification {
    id: string;
    title: string;
    subtitle?: string;
    type: 'normal' | 'success' | 'danger' | 'warning'
}

export interface GlobalState {
  loggedInUser: User | null;
  notifications: Notification[]
};

