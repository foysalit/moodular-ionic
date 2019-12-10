import React, { useState } from "react";
import { Emoji } from "emoji-mart";
import { inject, observer } from "mobx-react";
import { trash as trashIcon } from "ionicons/icons";
import {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonAlert,
    IonImg
} from "@ionic/react";

import { MoodStore } from "./MoodService";

type HistoryProps = {
    moodStore: MoodStore;
};

const printDate = (date: Date | string): string => {
    if (typeof date === "string") {
        date = new Date(date);
    }

    return date.toLocaleDateString();
};

const History: React.FC<HistoryProps> = ({ moodStore }) => {
    const [removingMoodId, setRemovingMoodId] = useState<number>(0);

    return (
        <IonPage>
            <IonAlert
                isOpen={removingMoodId > 0}
                onDidDismiss={() => setRemovingMoodId(0)}
                header={"Remove Mood?"}
                message={`Sure you want to remove mood?`}
                buttons={[
                    {
                        text: "Cancel",
                        role: "cancel",
                        cssClass: "secondary",
                        handler: () => setRemovingMoodId(0)
                    },
                    {
                        text: "Yes, Remove It",
                        handler: () => {
                            moodStore.remove(removingMoodId);
                            setRemovingMoodId(0);
                        }
                    }
                ]}
            />
            <h2 className="ion-padding">Mood History</h2>
            <IonContent>
                {moodStore.hasNoHistory ? (
                    <IonImg src="/assets/empty-state.svg" />
                ) : (
                    <IonList>
                        {moodStore.entries.map(mood => (
                            <IonItemSliding key={mood.id}>
                                <IonItem>
                                    <IonAvatar>
                                        <Emoji emoji={mood.emoji} size={30} />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h3>{printDate(mood.date)}</h3>
                                        <p>{mood.details || "No Details"}</p>
                                    </IonLabel>
                                </IonItem>{" "}
                                <IonItemOptions side="end">
                                    <IonItemOption
                                        color="danger"
                                        onClick={() => setRemovingMoodId(mood.id)}
                                    >
                                        <IonIcon icon={trashIcon} />
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default inject("moodStore")(observer(History));
