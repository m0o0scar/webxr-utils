import { Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import React, { FC } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export interface Log {
  type?: 'info' | 'warn' | 'error';
  tag?: string;
  message: string;
}

const logType2String = (type?: Log['type']) => {
  switch (type) {
    case 'warn':
      return '[!]';
    case 'error':
      return '[x]';
    default:
      return '[>]';
  }
};

const logType2Color = (type?: Log['type']) => {
  switch (type) {
    case 'warn':
      return '#F9ED69';
    case 'error':
      return '#F08A5D';
    default:
      return '#FFFFFF';
  }
};

const log2String = ({ type = 'info', tag, message }: Log) => {
  const result = [logType2String(type)];
  if (tag) result.push(`[${tag}]`);
  result.push(' ', message);
  return result.join('');
};

const logsAtom = atom<Log[]>({
  key: 'dev.logs',
  default: [],
});

export const useLogs = () => {
  const setLogs = useSetRecoilState(logsAtom);
  const addLog = (log: Log) => setLogs(values => [...values, log].slice(-10));
  const info = (tag: string, message: string) => addLog({ type: 'info', tag, message });
  const warn = (tag: string, message: string) => addLog({ type: 'warn', tag, message });
  const error = (tag: string, message: string) => addLog({ type: 'error', tag, message });
  return { addLog, info, warn, error };
};

export const Console: FC<GroupProps> = props => {
  const logs = useRecoilValue(logsAtom);

  const fontSize = 0.05;
  const lineHeight = fontSize * 1.2;

  return (
    <group {...props}>
      {logs.map((log, i) => (
        <Text
          key={i}
          position={[0, i * -lineHeight, 0]}
          anchorX="left"
          color={logType2Color(log.type)}
          fontSize={fontSize}
          font="/fonts/RobotoMono-Medium.ttf"
        >
          {log2String(log)}
        </Text>
      ))}
    </group>
  );
};
