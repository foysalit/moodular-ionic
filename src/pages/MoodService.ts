import { EmojiData } from "emoji-mart";
import { persist } from "mobx-persist";
import { observable, computed, action } from "mobx";

export interface Mood {
    emoji: EmojiData,
    details: string,
    date: Date,
    id: number,
};

export class MoodStore {
    @persist('list')
    @observable
    list: Mood[] = [];

    @computed get hasNoHistory(): boolean {
        return this.list.length < 1;
    };

    @computed get entries(): Mood[] {
        const sortFunc = (firstItem: Mood, secondItem: Mood): number => {
            if (firstItem.id > secondItem.id)
                return 1;

            if (firstItem.id < secondItem.id)
                return -1;

            return 0;
        };

        return this.list.slice().sort(sortFunc);
    };

    @action
    save(emoji: EmojiData, details: string, date: Date) {
        this.list.push({emoji, details, date, id: Date.now()});
    };

    @action
    remove(moodId: number) {
        const moodIndex = this.list.findIndex(({ id }) => moodId === id);
        this.list.splice(moodIndex, 1);
    };
};