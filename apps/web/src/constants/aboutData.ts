import { Bell, Folder, Star, Users } from "lucide-react";

export const sections = [
  {
    mainTitle: 'Efficient Task Management',
    mainSubtitle:
      'Stay on top of every task with powerful tools designed to streamline your workflow.',
    items: [
      {
        title: 'Prioritize Tasks',
        subtitle:
          'Focus on what matters most with tools for prioritization and deadlines.',
        icon: Star,
      },
      {
        title: 'Stay Notified',
        subtitle:
          'Never miss a deadline with smart reminders and progress tracking.',
        icon: Bell,
      },
    ],
    image: '/about1.png',
    alt: 'Task management illustration',
    reverseLayout: false,
  },

  {
    mainTitle: 'Simplify Your Workflow',
    mainSubtitle:
      'Achieve more with a streamlined approach to task planning and execution.',
    items: [
      {
        title: 'Collaborate Easily',
        subtitle:
          'Share updates, assign tasks, and achieve team goals effortlessly.',
        icon: Users,
      },
      {
        title: 'All in One Place',
        subtitle:
          'Centralize tasks, notes, and files to stay organized and clutter-free.',
        icon: Folder,
      },
    ],
    image: '/about2.png',
    alt: 'Team collaboration illustration',
    reverseLayout: true,
  },
];
