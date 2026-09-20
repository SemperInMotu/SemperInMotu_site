import { redirect } from 'next/navigation';

/** Belarusian locale disabled — send bookmarks to RU. */
export default function BeRootRedirect() {
  redirect('/ru/');
}
