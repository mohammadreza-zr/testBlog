CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`slug` text
);
--> statement-breakpoint
CREATE TABLE `contents` (
	`id` integer PRIMARY KEY NOT NULL,
	`rendered` text,
	`protected` integer
);
--> statement-breakpoint
CREATE TABLE `excerpts` (
	`id` integer PRIMARY KEY NOT NULL,
	`rendered` text,
	`protected` integer
);
--> statement-breakpoint
CREATE TABLE `featured_media` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`caption` text,
	`description` text,
	`width` integer,
	`height` integer,
	`file_size` integer,
	`source_url` text
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text,
	`date_gmt` text,
	`modified` text,
	`modified_gmt` text,
	`slug` text,
	`status` text,
	`type` text,
	`title_id` integer,
	`content_id` integer,
	`excerpt_id` integer,
	`category_id` integer,
	`featured_media_id` integer,
	FOREIGN KEY (`title_id`) REFERENCES `titles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`content_id`) REFERENCES `contents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`excerpt_id`) REFERENCES `excerpts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`featured_media_id`) REFERENCES `featured_media`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `titles` (
	`id` integer PRIMARY KEY NOT NULL,
	`rendered` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);