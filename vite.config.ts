import { defineConfig } from 'vite';

export default defineConfig({
  // This repo is a GitHub "user site" (kamillaka.github.io), served from the domain root.
  // If you ever move it to a project repo (username.github.io/repo-name/), change this to '/repo-name/'.
  base: '/',
});
