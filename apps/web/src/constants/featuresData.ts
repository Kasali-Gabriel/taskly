import {
  BetweenVerticalEnd,
  Calendar,
  FileText,
  Repeat,
  Smartphone,
  Users,
} from 'lucide-react';

export const features = [
  {
    title: 'Team Collaboration',
    subheading: 'Real-time Collaboration',
    description:
      'Work together seamlessly with real-time collaboration. Share updates, assign tasks, and communicate effortlessly within the platform. In addition to task assignment, you can use integrated chat, file sharing, and live project updates to keep your team connected and on the same page.',
    icon: Users,
    imageSrc: '/feature1.png',
  },

  {
    title: 'Deadline & Due Date Management',
    subheading: 'Deadline Tracking and Smart Reminders',
    description:
      'Set deadlines and receive smart reminders, ensuring your team stays on track and no important task slips through the cracks. You can set individual due dates for tasks and subtasks, and get reminders to ensure tasks are completed on time. Calendar view helps visualize deadlines.',
    icon: Calendar,
    imageSrc: '/feature2.png',
  },

  {
    title: 'Customizable Views',
    subheading: 'Flexible View Options',
    description:
      'Effortlessly switch between Board, Table, Timeline, and Calendar views to match your project management style. Visualize tasks with a Kanban board for an intuitive workflow, track details in Table, view deadlines on Timeline, or manage schedules with Calendar.',
    icon: BetweenVerticalEnd,
    imageSrc: '/feature3.png',
  },

  {
    title: 'Recurring Tasks',
    subheading: 'Automated Task Recurrence',
    description:
      'Automate repetitive tasks by setting them to recur on a schedule, saving time and reducing manual input. Set daily, weekly, or monthly recurrence for tasks. This is ideal for tasks like regular meetings, reports, or any recurring activity.',
    icon: Repeat,
    imageSrc: '/feature4.png',
  },

  {
    title: 'File Sharing & Document Management',
    subheading: 'Centralized File Management',
    description:
      'Centralize your project documents in one place. Share files easily, keeping everyone on the same page. Upload, store, and share project files such as documents, images, and spreadsheets. Easily reference them from within each task.',
    icon: FileText,
    imageSrc: '/feature5.png',
  },

  {
    title: 'Mobile & Cross-Device Support',
    subheading: 'Access Anywhere, Anytime',
    description:
      'Stay connected wherever you are. Access tasks, communicate with your team, and manage projects on any device with our mobile app. Work on the go with our mobile app. Sync your tasks, comments, and files across all devices, ensuring productivity never stops.',
    icon: Smartphone,
    imageSrc: '/feature6.png',
  },
];
