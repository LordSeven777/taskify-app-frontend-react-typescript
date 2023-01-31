import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import {
  FeedbackAttributes,
  FeedbackCreationAttributes,
  FeedbackEditAttributes,
} from '@customTypes/feedback';

// Utils
import { generateUniqueString } from '@utils/strings';

interface FeedbackSliceAttributes {
  browseFeedbacks: FeedbackAttributes[];
  actionFeedbacks: FeedbackAttributes[];
  notificationFeedbacks: FeedbackAttributes[];
}

interface FeedbackEditPayload {
  id: string | number;
  reason: FeedbackReason;
  data: FeedbackEditAttributes;
}

export type FeedbackReason = 'browse' | 'action' | 'notification';

const initialState: FeedbackSliceAttributes = {
  browseFeedbacks: [],
  actionFeedbacks: [],
  notificationFeedbacks: [],
};

const feedbacksSlice = createSlice({
  name: 'Feedbacks',
  initialState,
  reducers: {
    addFeedback(
      state,
      {
        payload,
      }: PayloadAction<{
        reason: FeedbackReason;
        data: FeedbackCreationAttributes;
      }>
    ) {
      const feedback: FeedbackAttributes = {
        id: payload.data.id ?? generateUniqueString(),
        type: payload.data.type ?? 'info',
        title: payload.data.title,
        message: payload.data.message,
      };
      payload.data.duration && (feedback.duration = payload.data.duration);
      payload.data.redirectTo &&
        (feedback.redirectTo = payload.data.redirectTo);
      const feedbacks = selectFeedbacksFromReason(payload.reason, state);
      feedbacks.push(feedback);
    },
    editFeedback(state, { payload }: PayloadAction<FeedbackEditPayload>) {
      const feedbacks = selectFeedbacksFromReason(payload.reason, state);
      const feedback = feedbacks.find((feedback) => feedback.id === payload.id);
      if (!feedback) return;
      feedback.type = payload.data.type ?? feedback.type;
      feedback.title = payload.data.title ?? feedback.title;
      feedback.message = payload.data.message ?? feedback.message;
      feedback.duration = payload.data.duration ?? feedback.duration;
      feedback.redirectTo = payload.data.redirectTo ?? feedback.redirectTo;
    },
    deleteFeedback(
      state,
      {
        payload,
      }: PayloadAction<{ id: string | number; reason: FeedbackReason }>
    ) {
      const feedbacks = selectFeedbacksFromReason(payload.reason, state);
      const filteredFeedbacks = feedbacks.filter((fb) => fb.id !== payload.id);
      switch (payload.reason) {
        case 'browse':
          state.browseFeedbacks = filteredFeedbacks;
          break;
        case 'action':
          state.actionFeedbacks = filteredFeedbacks;
          break;
        case 'notification':
          state.notificationFeedbacks = filteredFeedbacks;
          break;
        default:
          break;
      }
    },
  },
});

// HELPER: Gets the feedbacks array based on a feedback reason
function selectFeedbacksFromReason(
  reason: FeedbackReason,
  slice: FeedbackSliceAttributes
): FeedbackAttributes[] {
  switch (reason) {
    case 'action':
      return slice.actionFeedbacks;
    case 'browse':
      return slice.browseFeedbacks;
    case 'notification':
      return slice.notificationFeedbacks;
    default:
      throw new Error('The feedback action is not recognized');
  }
}

export const { addFeedback, editFeedback, deleteFeedback } =
  feedbacksSlice.actions;
export default feedbacksSlice.reducer;
