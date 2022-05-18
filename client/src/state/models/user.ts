export type User = {
	id: number;
	email: string;
	profile_id: string;
	profile_provider: string;
	profile_name: string;
	avatar: string | null;
	create_at: Date;
	update_at: Date;
};
