import { config } from '../config';
import cdn, { ImageFetchOptions } from './cdn';

interface SourceOptions {
  src: string;
  local?: boolean;
  options: ImageFetchOptions;
}

export function getSourceUrl(src: string) {
  if (src && src.includes('__zer0ImageCrop__=')) {
    try {
      let nonParams, queryParams, _ignore;
      [_ignore, nonParams, queryParams] = src.match(/(.*)\?(.*)/);

      queryParams = new URLSearchParams(queryParams);
      queryParams.delete('__zer0ImageCrop__');

      if (queryParams && [...queryParams.keys()].length !== 0) {
        return [nonParams, '?', queryParams.toString()].join('');
      }

      return nonParams;
    } catch (error) {
      console.log('error parsing source', error, src);
    }
  }

  return src;
}

export function getSource({ src, local = false, options = {} }: SourceOptions) {
  let source = src;

  if (!local) {
    if (source.indexOf('/assets/') >= 0 || source.indexOf('data:image') === 0) {
      return source;
    }

    source = getSourceUrl(source);

    const cloudinaryRegex = new RegExp(`https:\/\/res.cloudinary.com\/${config.cloudinary.cloud_name}\/(image|video)\/upload\/v[0-9]+\/`, 'i');
    source = source.replace(cloudinaryRegex, '');
    const isFetchType = source.indexOf('://') > 0;
    const cdnOptions = {
      ...options,
      type: isFetchType ? 'fetch' : undefined,
    };
    if (!isFetchType && cdnOptions.format && cdnOptions.resource_type === 'video') {
      source = source.substr(0, source.lastIndexOf('.')) + `.${cdnOptions.format}`;
    }
    source = cdn.url(source, cdnOptions);
  }

  return source;
}
