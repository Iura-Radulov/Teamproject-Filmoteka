import hashValue from './language';
export default function titleLibraryLang(title, original_name, original_title) {
  let hash = hashValue();
  if (hash === 'en') {
    return original_title ? original_title : original_name;
  } else if (hash === 'ua') {
    return title ? title : original_name;
  }
}
