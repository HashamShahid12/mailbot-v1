import { authorizedRequest } from "./client";

export interface EmailTemplate {
  id: string;
  name: string;
  email_template_json?: any;
  html?: { html: string } | string;
  image?: string;
  shop_id?: string | null;
  type?: string;
  tags?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TemplateResponse {
  success: boolean;
  statusCode?: number;
  data: {
    message?: string;
    email_template?: EmailTemplate;
    template?: EmailTemplate; // For empty template response
    email_templates?: EmailTemplate; // For get by id response
    updated_template?: EmailTemplate; // For update response
  };
  message?: string;
}

export interface TemplatesListResponse {
  success: boolean;
  statusCode?: number;
  data: {
    success: boolean;
    email_templates: {
      custom_templates: EmailTemplate[];
      default_templates: EmailTemplate[];
    };
  };
  message?: string;
}

export interface CreateTemplatePayload {
  name: string;
  email_template_json: any;
  html: { html: string };
  image?: string;
  type?: string;
  tags?: string;
}

export interface UpdateTemplatePayload {
  name?: string;
  email_template_json?: any;
  html?: { html: string };
  image?: string;
  type?: string;
  tags?: string;
}

export interface SnapshotPayload {
  html: string;
  css?: string;
  file_name?: string;
}

export interface SnapshotResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    success: boolean;
    snap_shot_url: string;
  };
}

// POST /api/email-template - Create email template
export async function createTemplate(data: CreateTemplatePayload) {
  console.log("[TemplateAPI] Create template request initiated.", data.name);
  try {
    return authorizedRequest<TemplateResponse>("/api/email-template", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("[TemplateAPI] Create template request failed:", error);
    throw error;
  }
}

// GET /api/email-template - Get email templates
export async function getTemplates() {
  console.log("[TemplateAPI] Get templates request initiated.");
  try {
    return authorizedRequest<TemplatesListResponse>("/api/email-template", {
      method: "GET",
    });
  } catch (error) {
    console.error("[TemplateAPI] Get templates request failed:", error);
    throw error;
  }
}

// GET /api/email-template/empty-template - Get empty email template
export async function getEmptyTemplate() {
  console.log("[TemplateAPI] Get empty template request initiated.");
  try {
    return authorizedRequest<TemplateResponse>(
      "/api/email-template/empty-template",
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("[TemplateAPI] Get empty template request failed:", error);
    throw error;
  }
}

// PUT /api/email-template/{id} - Update email template
export async function updateTemplate(id: string, data: UpdateTemplatePayload) {
  console.log("[TemplateAPI] Update template request initiated.", id);
  try {
    return authorizedRequest<TemplateResponse>(`/api/email-template/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("[TemplateAPI] Update template request failed:", error);
    throw error;
  }
}

// GET /api/email-template/{id} - Get email template by id
export async function getTemplateById(id: string) {
  console.log("[TemplateAPI] Get template by ID request initiated.", id);
  try {
    return authorizedRequest<TemplateResponse>(`/api/email-template/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("[TemplateAPI] Get template by ID request failed:", error);
    throw error;
  }
}

// DELETE /api/email-template/{id} - Delete email template
export async function deleteTemplate(id: string) {
  console.log("[TemplateAPI] Delete template request initiated.", id);
  try {
    return authorizedRequest<any>(`/api/email-template/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("[TemplateAPI] Delete template request failed:", error);
    throw error;
  }
}

// POST /api/email-template/snapshot - Create email template snapshot
export async function createTemplateSnapshot(data: SnapshotPayload) {
  console.log("[TemplateAPI] Create snapshot request initiated.");
  try {
    return authorizedRequest<SnapshotResponse>("/api/email-template/snapshot", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("[TemplateAPI] Create snapshot request failed:", error);
    throw error;
  }
}
