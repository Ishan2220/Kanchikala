import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { execSync } from 'child_process';

function watchPublicImagesPlugin() {
  return {
    name: 'watch-public-images',
    configureServer(server: any) {
      server.watcher.add(path.resolve(__dirname, 'public'));
      server.watcher.on('all', (_event: string, filePath: string) => {
        if (/\.(webp|png|jpg|jpeg|gif)$/i.test(filePath)) {
          console.log(`[Auto-Sync] Detected image change. Syncing cards...`);
          try {
            execSync('node sync-products.mjs', { stdio: 'inherit' });
          } catch (e) {
            // ignore
          }
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), watchPublicImagesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
