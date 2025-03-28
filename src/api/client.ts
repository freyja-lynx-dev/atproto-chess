import { CredentialManager, XRPC } from '@atcute/client'

const manager = new CredentialManager({
  service: 'https://bsky.social',
})

export const xrpc = new XRPC({ handler: manager })
