---
name: use-query-writer
description: This is the guidelines to follow when implementing useQuery. Please use them when implementing useQuery.
---

# use-query-writer

## Instructions

`useQuery`를 사용해서 상태 관리를 할 때 다음과 같이 구현해주세요:

1. 가장 가까운 `hooks` 디렉토리에 `use{NAME}Query`라는 custom hook 만들어주세요.
2. `if`문을 사용해서, `isPending` 상태일 때와 `isError` 상태일 때 보여줄 컴포넌트를 구현해주세요.
3. `isPending` 상태일 때, `src\components\ui\skeleton.tsx` 컴포넌트 사용해서 로딩 상태 보여주세요.
4. `queryKey`는 `src\constants\query-keys.ts`에 있는 `QUERY_KEYS` 사용해주세요.
5. File 이름은 모두 소문자로 작성하고, 하이픈('-')으로 단어 구분해주세요.
