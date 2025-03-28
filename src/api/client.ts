import { CredentialManager, XRPC } from '@atcute/client'

const manager = new CredentialManager({
  service: 'https://bsky.social',
})

export const agent = new XRPC({ handler: manager })
