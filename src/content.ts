import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { sortByDateDesc } from './lib/filters';

export type EventEntry = CollectionEntry<'events'>;

export async function getAllEvents(): Promise<EventEntry[]> {
  const events = await getCollection('events');
  return sortByDateDesc(events);
}

export async function getEventById(id: string): Promise<EventEntry | undefined> {
  const events = await getCollection('events');
  return events.find((e: EventEntry) => e.id === id);
}
