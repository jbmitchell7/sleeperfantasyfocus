export interface LeagueUser {
    user_id: string;
    settings: null;
    metadata: LeagueUserMetadata;
    league_id: string;
    is_owner: boolean;
    is_bot: boolean;
    display_name: string;
    avatar: string
    avatarUrl?: string;
}

export interface LeagueUserMetadata {
    team_name: string;
    mascot_message_emotion_leg_4: string;
    mascot_item_type_id_leg_9: string;
    mascot_item_type_id_leg_8: string;
    mascot_item_type_id_leg_7: string;
    mascot_item_type_id_leg_6: string;
    mascot_item_type_id_leg_5: string;
    mascot_item_type_id_leg_4: string;
    mascot_item_type_id_leg_18: string;
    mascot_item_type_id_leg_17: string;
    mascot_item_type_id_leg_16: string;
    mascot_item_type_id_leg_15: string;
    mascot_item_type_id_leg_14: string;
    mascot_item_type_id_leg_13: string;
    mascot_item_type_id_leg_12: string;
    mascot_item_type_id_leg_11: string;
    mascot_item_type_id_leg_10: string;
}