import { IonContent, IonPage, IonAlert, IonToast } from '@ionic/react';
import { Picker, EmojiData } from 'emoji-mart';
import { inject, observer } from "mobx-react";
import React, { useState } from 'react';

import { MoodStore } from "./MoodService";

type HomeProps = {
    moodStore: MoodStore,
};

const Home: React.FC<HomeProps> = ({ moodStore }) => {    
    const [showMoodLoggedToast, setShowMoodLoggedToast] = useState<boolean>(false);
    const [showInputs, setShowInputs] = useState(false);
    const [emoji, setEmoji] = useState<any>(null);

    const handleEmojiSelect = (selection: EmojiData) => {
        setEmoji(selection);
        setShowInputs(true);
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h2>
                    Moodular
                </h2>

                <Picker
                    title="Pick your mood"
                    include={["people"]}
                    onSelect={handleEmojiSelect}
                />
                
                <IonToast
                    duration={2000}
                    isOpen={showMoodLoggedToast}
                    message="Your mood has been logged."
                    onDidDismiss={() => setShowMoodLoggedToast(false)}
                />

                <IonAlert
                    isOpen={showInputs}
                    subHeader="Add more details or set the time/date for your mood"
                    onDidDismiss={() => setShowInputs(false)}
                    header={`Add Details`}
                    inputs={[
                        {
                            type: "text",
                            name: "details",
                            placeholder: "Write out how you are feeling..."
                        },
                        {
                            name: "date",
                            type: "date",
                            max: `{new Date()}`,
                            min: "2017-09-09",
                            value: new Date(),
                            placeholder: "Change date"
                        }
                    ]}
                    buttons={[
                        {
                            text: "Cancel",
                            role: "cancel",
                            cssClass: "secondary",
                            handler: () => {
                                setShowInputs(false);
                                setEmoji(null);
                            }
                        },
                        {
                            text: "Ok",
                            handler: data => {
                                moodStore.save(emoji, data.details, data.date);
                                setShowMoodLoggedToast(true);
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default inject("moodStore")(observer(Home));
