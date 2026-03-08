export type ProgressCompletionState = {
  isCompleted: boolean;
  completedAt?: string | null;
  evidenceRef?: string | null;
};

export type ProgressAchievement = {
  id: string;
  name: string;
  order: number;
  completion: ProgressCompletionState;
};

export type ProgressSection = {
  id: string;
  title: string;
  order: number;
  achievements: ProgressAchievement[];
};

export type ProgressHierarchyResponse = {
  sections: ProgressSection[];
  fetchedAt?: string;
};
