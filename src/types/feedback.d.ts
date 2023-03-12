export type FeedbackType = 'success' | 'info' | 'error' | 'loading';

export interface FeedbackAttributes {
  id: string | number;
  type: FeedbackType;
  title: string;
  message: string;
  duration?: number | null;
  redirectTo?: string;
}

export type FeedbackAttributesWithoutId = Omit<FeedbackAttributes, 'id'>;

export type FeedbackCreationAttributes = Partial<FeedbackAttributes> &
  Pick<FeedbackAttributes, 'message' | 'title'>;

export type FeedbackEditAttributes = Omit<Partial<FeedbackAttributes>, 'id'>;
