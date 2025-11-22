import { useState } from 'react';

import css from './App.module.css';

import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

import type { VoteType, Votes } from '../../types/votes'; // types

export default function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, bad: 0, neutral: 0 });

  function handleVote(vote: VoteType) {
    const temp = {
      ...votes,
      [vote]: votes[vote] + 1,
    };

    setVotes(temp);
  }

  function resetVotes() {
    setVotes({ good: 0, bad: 0, neutral: 0 });
  }

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={votes.good > 0 || votes.neutral > 0 || votes.bad > 0}
      />

      {totalVotes ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
