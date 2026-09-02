import {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {API_BASE_URL, api} from '../api/client';

type Ping = {
  ok: boolean;
  message: string;
  uptime: number;
  timestamp: string;
};

type State =
  | {status: 'idle'}
  | {status: 'loading'}
  | {status: 'ok'; data: Ping}
  | {status: 'error'; error: string};

export function PingPanel({bottomInset = 0}: {bottomInset?: number}) {
  const isDark = useColorScheme() === 'dark';
  const [state, setState] = useState<State>({status: 'idle'});

  const onPress = async () => {
    setState({status: 'loading'});
    try {
      const data = await api<Ping>('/ping');
      setState({status: 'ok', data});
    } catch (e) {
      setState({status: 'error', error: (e as Error).message});
    }
  };

  return (
    <View
      style={[
        styles.panel,
        isDark && styles.panelDark,
        {paddingBottom: 16 + bottomInset},
      ]}>
      <Pressable
        onPress={onPress}
        disabled={state.status === 'loading'}
        style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
        {state.status === 'loading' ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ping the backend</Text>
        )}
      </Pressable>

      <Text style={[styles.result, isDark && styles.resultDark]}>
        {state.status === 'idle' && `waiting — ${API_BASE_URL}`}
        {state.status === 'loading' && 'requesting…'}
        {state.status === 'ok' &&
          `✅ ${state.data.message} (uptime ${state.data.uptime}s)`}
        {state.status === 'error' && `❌ ${state.error}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    padding: 16,
    gap: 10,
    backgroundColor: '#f2f2f7',
  },
  panelDark: {
    backgroundColor: '#1c1c1e',
  },
  button: {
    backgroundColor: '#0a84ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  result: {
    fontSize: 13,
    textAlign: 'center',
    color: '#3c3c43',
  },
  resultDark: {
    color: '#ebebf5',
  },
});
