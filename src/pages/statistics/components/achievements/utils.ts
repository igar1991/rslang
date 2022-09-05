import { Achievement, Statistics } from 'types/types';

export const getRequestBody = (
  achievementName: string,
  achievement: Achievement | undefined,
  action: 'shown' | 'achieved',
  learnedWords: number,
  statistic: Statistics
) => {
  return {
    learnedWords: learnedWords,
    optional: {
      ...statistic.optional,
      achievements: {
        ...statistic.optional.achievements,
        [achievementName]: {
          ...achievement,
          [action]: true,
        } as Achievement,
      },
    },
  };
};
