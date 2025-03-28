# atproto-chess

Email chess for a modern era, built on the AT Protocol.

## Bird's-eye Perspective

The data flow is as follows:

- User A invites another with a `...chess.invite`.
- User B `...chess.accept`s this invite, determines whether they want to go first or not. If so, they attach a `...chess.move`.
- Each `...chess.move` will be strongreffed to both the original `...chess.accept` and the previous move of the opponent.
- Each player will track the state of the match using a `...chess.state` record, updated after each of their own moves.
- Players can `...chess.concede` a match, rendering it finished.

This forms a decentralized reverse-singly-linked list of sorts, which represents a chess match. Ideally, you should be able to rebuild the state of an ongoing chess match solely using the data from each player's PDS -- no intermediary AppView required, and both players would have the same match state. While it is technically possible to accomplish this with just `accept` and `move` records, the `state` record reduces the computational complexity of re-discovering match state, and comparing two `state` records from each player would allow a stable reconstruction of match state.

Additionally, because of the way `strongref`s work, this match data should also be relatively tamper-resistant. As each move is linked to the previous move based on a hash of the data at-move-creation, if a user were to go back and edit a previous record, the tampering would be detected by comparing the CIDs of the tampered move and the move at-creation. One form of tampering that cannot be accounted for, at least without an intermediary AppView to act as a "referee" of sorts, is a player "taking back" a move they had previously submitted -- otherwise, CID checking on the user-side _should_ be able to indicate when the other player has tampered with the match.

Ultimately, this is just an experiment -- an excuse to learn web development with Vue.js, an excuse to play with the at protocol, and an excuse to finally learn how chess works.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Special Thanks

- [PinkSea](https://github.com/shinolabs/PinkSea)
- [psky-atp](https://github.com/psky-atp/)
- [PDSls](https://github.com/notjuliet/pdsls)
- [atcute](https://codeberg.org/mary-ext/atcute)
