import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  Calendar,
  Home,
  ShieldAlert,
  User,
  Users,
} from 'lucide-react';

export const sidebarLinks = [
  { route: '/Home', icon: Home, label: 'Home' },
  { route: '/Timeline', icon: Briefcase, label: 'Timeline' },
  { route: '/calenderView', icon: Calendar, label: 'Calendar View' },
  { route: '/users', icon: User, label: 'Users' },
  { route: '/teams', icon: Users, label: 'Teams' },
];

export const projectLinks = [
  { route: '/workspace1', icon: Briefcase, label: 'Project 1' },
  { route: '/workspace2', icon: Briefcase, label: 'Project 2' },
  { route: '/workspace3', icon: Briefcase, label: 'Project 3' },
];

export const priorityLinks = [
  { route: '/priority1', icon: AlertCircle, label: 'Urgent' },
  { route: '/priority2', icon: ShieldAlert, label: 'High' },
  { route: '/priority3', icon: AlertTriangle, label: 'Medium' },
  { route: '/priority4', icon: AlertOctagon, label: 'Low' },
];
