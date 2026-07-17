import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { ptBRLocale } from '@sanity/locale-pt-br';

export default defineConfig({
  name: 'default',
  title: 'Blog Dra. Geanne Lopes | Conteúdos',
  projectId,
  dataset,
  plugins: [
    ptBRLocale(),
    structureTool({ structure }),
    visionTool(),
  ],
  schema,
});
