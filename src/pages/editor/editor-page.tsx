import { EmailEditor, LanguageProvider } from "template-builder";
import "template-builder/style.css";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCampaignStore } from "@/store/useCampaignStore";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import {
  createTemplate,
  updateTemplate,
  getTemplateById,
  createTemplateSnapshot,
  type EmailTemplate,
} from "@/api/email-templates";
import { uploadTemplateImage } from "@/api/newsletter-settings";
import { uploadImage } from "@/api/media";

const EditorPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { campaignForm, setCampaignForm } = useCampaignStore();
  const isCampaignSource = searchParams.get("source") === "campaign";
  const templateId = searchParams.get("id");

  console.log(templateId, "idd");

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [initialTemplate, setInitialTemplate] = useState<any>(undefined);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) return;

      setLoading(true);
      try {
        const res = await getTemplateById(templateId);
        if (res.success && res.data.email_templates) {
          const tmpl = res.data.email_templates;
          const json = tmpl.email_template_json || {};
          // Check for nested template structure (common in some saves) or direct components
          const components = json.template?.components || json.components || [];

          setInitialTemplate({
            id: tmpl.id,
            name: tmpl.name,
            category: tmpl.type || "custom",
            components: components,
            metadata: json.metadata,
            globalSettings: json.globalSettings,
          });
        }
      } catch (error) {
        console.error("Failed to load template:", error);
        toaster.create({
          title: "Error",
          description: "Failed to load template",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplate();
    } else if (
      isCampaignSource &&
      Object.keys(campaignForm.template_json).length > 0
    ) {
      const json = campaignForm.template_json || {};
      const components = json.template?.components || json.components || [];

      setInitialTemplate({
        id: "campaign-template",
        name: campaignForm.template_name,
        category: "custom",
        components: components,
        metadata: json.metadata,
        globalSettings: json.globalSettings,
      });
    }
  }, [templateId, isCampaignSource, campaignForm]);

  const handleSave = async (
    html: string,
    json: string | object,
    name: string,
  ) => {
    console.log("handleSave called", { name, templateId, isCampaignSource });

    setSaveLoading(true);
    try {
      const templateData = typeof json === "string" ? JSON.parse(json) : json;
      let snapshotUrl = "";

      // Generate snapshot for both create and update
      try {
        const snapRes = await createTemplateSnapshot({
          html,
          file_name: `snapshot-${Date.now()}`,
        });
        if (snapRes.success && snapRes.data.snap_shot_url) {
          snapshotUrl = snapRes.data.snap_shot_url;
        }
      } catch (snapError) {
        console.error("Snapshot generation failed:", snapError);
      }

      // 1. Update existing template (if ID exists) - Applies to both Standard and Campaign flows
      if (templateId) {
        console.log("Updating existing template:", templateId);
        const res = await updateTemplate(templateId, {
          name,
          html: { html },
          email_template_json: templateData,
          image: snapshotUrl,
          type: "custom",
        });

        if (res.success) {
          toaster.create({
            title: "Saved",
            description: "Template updated successfully",
            type: "success",
          });
        } else {
          throw new Error("Failed to update template");
        }
      }
      // 2. Create new template (Standard flow OR Campaign flow if no ID)
      else if (!templateId) {
        const createRes = await createTemplate({
          name,
          html: { html },
          email_template_json: templateData,
          image: snapshotUrl,
          type: "custom",
        });

        if (createRes.success && createRes.data.email_template) {
          toaster.create({
            title: "Saved",
            description: "Template created successfully",
            type: "success",
          });

          // If NOT campaign source, just update URL and stay or go back
          if (!isCampaignSource) {
            setSearchParams({ id: createRes.data.email_template.id });
            navigate(-1);
            return;
          }

          // If IS campaign source, we need this response for the next block
          // We'll let the code fall through to the campaign handling block
          // but we need to store the response in a variable accessible there.
          // Refactoring slightly to make `createRes` available.

          // 3. Campaign Flow: Update store and navigate
          if (isCampaignSource) {
            console.log("Saving to campaign store");

            // Use the ID from the newly created template
            const newTemplateId = createRes.data.email_template.id;

            setCampaignForm({
              template_id: newTemplateId,
              template_html: { body: html },
              template_json: templateData,
              template_name: name,
              template_image: snapshotUrl,
            });

            // Navigate back to Campaign Step 2 (Templates)
            navigate("/new-campaign?step=1&refresh=" + Date.now());
            return;
          }
        }
      }

      // 3. Campaign Flow: Update store and navigate (Existing Template Update case)
      if (isCampaignSource && templateId) {
        console.log("Saving to campaign store");

        setCampaignForm({
          template_id: templateId,
          template_html: { body: html },
          template_json: templateData,
          template_name: name,
          template_image: snapshotUrl,
        });

        // Navigate back to Campaign Step 2 (Templates)
        navigate("/new-campaign?step=1&refresh=" + Date.now());
        return;
      }

      // Standard Flow: Navigate back after update
      if (templateId) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Failed to save template:", error);
      toaster.create({
        title: "Error",
        description: "Failed to save template",
        type: "error",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadImage(formData);
      console.log(res, "ress");
      if (res.success && res.data.logo) {
        return res.data.logo;
      }
      throw new Error("Failed to get image URL from response");
    } catch (error) {
      console.error("Image upload failed:", error);
      toaster.create({
        title: "Error",
        description: "Failed to upload image",
        type: "error",
      });
      throw error;
    }
  };

  const handleBack = () => {
    if (isCampaignSource) {
      navigate("/new-campaign?step=1");
    } else {
      navigate(-1);
    }
  };

  if (loading || (templateId && !initialTemplate)) {
    return (
      <Center h="100vh" w="100vw">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box className="email-eidtor" h="100vh" w="100vw">
      <LanguageProvider>
        <EmailEditor
          onSave={handleSave}
          onUpdate={handleSave}
          onBack={handleBack}
          onUploadImage={handleUploadImage}
          loading={saveLoading}
          initialTemplate={initialTemplate}
        />
      </LanguageProvider>
    </Box>
  );
};

export default EditorPage;
