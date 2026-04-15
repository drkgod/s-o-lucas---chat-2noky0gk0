// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      instagram_accounts: {
        Row: {
          created_at: string | null
          id: string
          instagram_access_token: string | null
          instagram_account_name: string
          instagram_user_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          instagram_access_token?: string | null
          instagram_account_name: string
          instagram_user_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          instagram_access_token?: string | null
          instagram_account_name?: string
          instagram_user_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'instagram_accounts_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      messages: {
        Row: {
          contact_instagram_id: string
          contact_name: string | null
          created_at: string | null
          id: string
          instagram_account_id: string
          message_direction: string
          message_text: string
          status: string | null
          user_id: string
        }
        Insert: {
          contact_instagram_id: string
          contact_name?: string | null
          created_at?: string | null
          id?: string
          instagram_account_id: string
          message_direction: string
          message_text: string
          status?: string | null
          user_id: string
        }
        Update: {
          contact_instagram_id?: string
          contact_name?: string | null
          created_at?: string | null
          id?: string
          instagram_account_id?: string
          message_direction?: string
          message_text?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'messages_instagram_account_id_fkey'
            columns: ['instagram_account_id']
            isOneToOne: false
            referencedRelation: 'instagram_accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'messages_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      scheduled_posts: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          instagram_account_id: string
          media_url: string | null
          post_type: string
          scheduled_date: string
          status: string
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          instagram_account_id: string
          media_url?: string | null
          post_type: string
          scheduled_date: string
          status?: string
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          instagram_account_id?: string
          media_url?: string | null
          post_type?: string
          scheduled_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'scheduled_posts_instagram_account_id_fkey'
            columns: ['instagram_account_id']
            isOneToOne: false
            referencedRelation: 'instagram_accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'scheduled_posts_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          password?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: instagram_accounts
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   instagram_account_name: text (not null)
//   instagram_access_token: text (nullable)
//   instagram_user_id: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: messages
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   instagram_account_id: uuid (not null)
//   contact_name: text (nullable)
//   contact_instagram_id: text (not null)
//   message_text: text (not null)
//   message_direction: text (not null)
//   status: text (nullable, default: 'pending'::text)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: scheduled_posts
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   instagram_account_id: uuid (not null)
//   caption: text (nullable)
//   media_url: text (nullable)
//   scheduled_date: timestamp with time zone (not null)
//   post_type: text (not null)
//   status: text (not null, default: 'pending'::text)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: users
//   id: uuid (not null)
//   email: text (not null)
//   password: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: instagram_accounts
//   PRIMARY KEY instagram_accounts_pkey: PRIMARY KEY (id)
//   FOREIGN KEY instagram_accounts_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// Table: messages
//   FOREIGN KEY messages_instagram_account_id_fkey: FOREIGN KEY (instagram_account_id) REFERENCES instagram_accounts(id) ON DELETE CASCADE
//   CHECK messages_message_direction_check: CHECK ((message_direction = ANY (ARRAY['incoming'::text, 'outgoing'::text])))
//   PRIMARY KEY messages_pkey: PRIMARY KEY (id)
//   FOREIGN KEY messages_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// Table: scheduled_posts
//   FOREIGN KEY scheduled_posts_instagram_account_id_fkey: FOREIGN KEY (instagram_account_id) REFERENCES instagram_accounts(id) ON DELETE CASCADE
//   PRIMARY KEY scheduled_posts_pkey: PRIMARY KEY (id)
//   CHECK scheduled_posts_post_type_check: CHECK ((post_type = ANY (ARRAY['feed'::text, 'story'::text])))
//   CHECK scheduled_posts_status_check: CHECK ((status = ANY (ARRAY['pending'::text, 'posted'::text, 'failed'::text])))
//   FOREIGN KEY scheduled_posts_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// Table: users
//   UNIQUE users_email_key: UNIQUE (email)
//   FOREIGN KEY users_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY users_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: instagram_accounts
//   Policy "Accounts delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Accounts insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Accounts select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Accounts update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: messages
//   Policy "Messages delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Messages insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Messages select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Messages update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: scheduled_posts
//   Policy "Posts delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Posts insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Posts select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Posts update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: users
//   Policy "Users can update own data" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)
//   Policy "Users can view own data" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.users (id, email, password)
//     VALUES (NEW.id, NEW.email, NEW.encrypted_password)
//     ON CONFLICT (id) DO NOTHING;
//     RETURN NEW;
//   END;
//   $function$
//

// --- INDEXES ---
// Table: users
//   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email)
