'use client';

import { FeatureState, SideBarState, TableState, TabState } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSideBarStore = create<SideBarState>()(
  persist(
    (set) => ({
      value: false,
      teams: false,
      projects: false,
      sortType: 'lastModified',
      setSortType: (criteria: string) => set({ sortType: criteria }),
      setSideBar: (value: boolean) => set({ value }),
      setTeams: (value: boolean) => set({ teams: value }),
      setProjects: (value: boolean) => set({ projects: value }),
    }),
    {
      name: 'sidebarStorage',
    },
  ),
);

export const useTabStore = create<TabState>()(
  persist(
    (set) => ({
      activeTab: '',
      setActiveTab: (activeTab: string) => set({ activeTab }),
    }),
    {
      name: 'tabStorage',
    },
  ),
);

export const useTableStore = create<TableState>()(
  persist(
    (set) => ({
      sorting: [],
      columnVisibility: {},
      setSorting: (updaterOrValue) =>
        set((state) => ({
          sorting:
            typeof updaterOrValue === 'function'
              ? updaterOrValue(state.sorting)
              : updaterOrValue,
        })),
      setColumnVisibility: (updaterOrValue) =>
        set((state) => ({
          columnVisibility:
            typeof updaterOrValue === 'function'
              ? updaterOrValue(state.columnVisibility)
              : updaterOrValue,
        })),
    }),
    {
      name: 'tableStorage',
    },
  ),
);

export const useFeatureStore = create<FeatureState>()(
  persist(
    (set) => ({
      openFeatureIndex: null,
      defaultFeatureIndex: null,
      setOpenFeatureIndex: (index: string | null) =>
        set({ openFeatureIndex: index }),
      setDefaultFeatureIndex: (index: string | null) =>
        set({ defaultFeatureIndex: index }),
    }),
    {
      name: 'featureStorage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
