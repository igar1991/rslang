import { CircularProgress, Stack } from '@mui/material';
import { wordsAPI } from 'api/wordsService';
import AudioCallRender from 'pages/games/audiocall/audiocall-render';
import SprintRender from 'pages/games/sprint/sprint-render';
import { WORDS_PER_PAGE } from 'pages/vocabulary/vocabulary-words/constants';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';

export default function GemesAuthRender({ game }: { game: string }) {
  const { id } = useAppSelector(selectAuth);
  const { data: learnedWords } = wordsAPI.useGetAllAggregatedWordsQuery({
    id: id,
    wordsPerPage: WORDS_PER_PAGE,
    filter: '{"userWord.optional.learned":true}',
  });
  const { data: dataStatistic } = wordsAPI.useGetUserStatisticsQuery(id);

  return (
    <>
      {learnedWords ? (
        game === 'audioCall' ? (
          <AudioCallRender learnedWords={learnedWords[0].paginatedResults} dataStatistic={dataStatistic ?? null}/>
        ) : (
          <SprintRender learnedWords={learnedWords[0].paginatedResults} dataStatistic={dataStatistic ?? null}/>
        )
      ) : (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction='row'>
          <CircularProgress color='secondary' />
        </Stack>
      )}
    </>
  );
}
