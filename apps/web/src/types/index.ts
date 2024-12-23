import { SortingState, VisibilityState } from '@tanstack/react-table';
import { LucideIcon } from 'lucide-react';

export interface SideBarLinkProps {
  route: string;
  icon: LucideIcon;
  label: string;
}

export interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  toggleOpen: () => void;
  links: SideBarLinkProps[];
  sectionRef: React.RefObject<HTMLDivElement>;
}

export interface HeaderProps {
  name: string;
  butttonComponent?: any;
  isSmallText?: boolean;
}

export interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface TabButtonProps {
  name: string;
  icon: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface SearchBarProps {
  placeholder: string;
}

export interface SideBarState {
  value: boolean;
  priority: boolean;
  projects: boolean;
  setSideBar: (value: boolean) => void;
  setPriority: (value: boolean) => void;
  setProjects: (value: boolean) => void;
}

export interface TabState {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export interface TableState {
  sorting: SortingState;
  columnVisibility: VisibilityState;
  setSorting: (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState),
  ) => void;
  setColumnVisibility: (
    updaterOrValue:
      | VisibilityState
      | ((old: VisibilityState) => VisibilityState),
  ) => void;
}

export interface InputFieldProps {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  fieldType?: string;
}

export interface DatePickerFieldProps {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
}

export interface DateRangePickerFieldProps {
  form: any;
  name: string;
  label?: string;
  sideOffset?: number;
}

export interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ElementType;
  imageSrc: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface FeatureButtonProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface FeatureState {
  openFeatureIndex: string | null;
  defaultFeatureIndex: string | null;
  setOpenFeatureIndex: (index: string | null) => void;
  setDefaultFeatureIndex: (index: string | null) => void;
}

export interface Testimonial {
  text: string;
  imgSrc: string;
  author: string;
  job: string;
  companyImgSrc?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className: string;
}
