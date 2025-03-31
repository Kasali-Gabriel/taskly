'use client';

import { UserContext } from '@/context/UserContext';
import { GET_PROJECTS_FOR_USER, GET_TEAMS_FOR_USER } from '@/graphql/queries';
import { useSideBarStore } from '@/lib/state';
import { ProjectLink } from '@/types';
import { Project } from '@/types/task';
import { useQuery } from '@apollo/client';
import {
  ChartNoAxesCombined,
  Folder,
  Home,
  SquareCheckBig,
  UsersRound,
} from 'lucide-react';
import { useContext, useMemo } from 'react';

const SidebarData = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  const { sortType } = useSideBarStore();

  const { data: projectData } = useQuery(GET_PROJECTS_FOR_USER, {
    variables: { userId },
  });

  const { data: teamData } = useQuery(GET_TEAMS_FOR_USER, {
    variables: { userId },
  });

  const sidebarLinks = [
    { route: '/Home', icon: Home, label: 'Home' },
    { route: '/Task', icon: SquareCheckBig, label: 'My Tasks' },
    { route: '/Insights', icon: ChartNoAxesCombined, label: 'Dashboard' },
  ];

  const projectLinks = useMemo(() => {
    if (!projectData?.getProjectsForUser) return [];

    const projectLinks: ProjectLink[] = projectData.getProjectsForUser
      .map((project: Project) => ({
        route: `/projects/${project.id}`,
        icon: Folder,
        label: project.name,
        lastModified: new Date(project.modifiedOn),
        dueDate: new Date(project.endDate),
        creationTime: new Date(project.createdOn),
      }))
      .sort(
        (a: ProjectLink, b: ProjectLink) =>
          b.lastModified.getTime() - a.lastModified.getTime(),
      );

    return projectLinks;
  }, [projectData]);

  const sortedProjectLinks = useMemo(() => {
    return [...(projectLinks || [])].sort((a: ProjectLink, b: ProjectLink) => {
      switch (sortType) {
        case 'alphabetical':
          return a.label.localeCompare(b.label);
        case 'lastModified':
          return b.lastModified.getTime() - a.lastModified.getTime();
        case 'dueDate':
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'creationTime':
          return b.creationTime.getTime() - a.creationTime.getTime();
        default:
          return 0;
      }
    });
  }, [sortType, projectLinks]);

  const teamLinks = useMemo(() => {
    if (!teamData?.getTeamsForUser) return [];

    return teamData.getTeamsForUser.map((team: any) => ({
      route: `/team/${team.id}`,
      icon: UsersRound,
      label: team.name,
    }));
  }, [teamData]);

  return {
    sidebarLinks,
    projectLinks: sortedProjectLinks,
    teamLinks,
  };
};

export default SidebarData;
