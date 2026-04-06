import { create } from "zustand";
import {
  fetchCustomFlows,
  fetchFlowByType,
  fetchAllAutomation,
  fetchFlowData,
  createFlow,
  updateFlow,
  fetchDefaultFlowTemplate,
} from "@/api/flow-api";
import { initialEdges, flowsNodeStyles } from "@/constants";
import type { FlowState } from "@/types/flow-store-props";

// Helper functions (extracted logic)
const ulid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const useFlowStore = create<FlowState>((set, get) => ({
  // State Init
  flowData: {
    title: "",
    message: "",
    previewText: "",
    templateName: "",
    templateJson: {},
    templateHtml: {},
    templateImage: "",
    discountCode: "",
  },
  nodes: [],
  edges: [],
  flowTypeData: { overall: {}, flow: null },
  nodeOptions: {
    lastId: "1",
    nextId: 3,
    counts: {},
    type: "",
    isBtnModalOpen: false,
    isCreatingFlow: false,
    flowId: "",
    newEmailNodes: [],
    isTriggerAdded: false,
  },
  selectedNode: {
    type: "",
    id: "",
    options: {},
  },
  flowsPageLoading: true,
  automation: {
    all: [],
    overall: [],
    shopSettings: [],
    all_shopify_flows: [],
    backendTypes: {},
  },
  activeModal: null,

  // Actions Implementation
  setFlowData: (update) =>
    set((state) => ({
      flowData:
        typeof update === "function"
          ? { ...state.flowData, ...update(state.flowData) }
          : { ...state.flowData, ...update },
    })),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setFlowTypeData: (data) => set({ flowTypeData: data }),
  setNodeOptions: (data) => set({ nodeOptions: data }),
  setSelectedNode: (data) => set({ selectedNode: data }),
  setFlowsPageLoading: (loading) => set({ flowsPageLoading: loading }),
  setAutomation: (data) => set({ automation: data }),
  setActiveModal: (modal) => set({ activeModal: modal }),

  handleEdgesChange: (payload) => set({ edges: payload }),
  handleNodesChange: (payload) => set({ nodes: payload }),
  handleNodeOptionsChange: (payload) => set({ nodeOptions: payload }),
  handleSelectedNodeChange: (payload) => set({ selectedNode: payload }),

  handleChangeFlowData: (newValue, name) =>
    set((state) => ({
      flowData: {
        ...state.flowData,
        [name]: newValue,
      },
    })),

  getCustomFlows: async (activeDateRange) => {
    set({ flowsPageLoading: true });
    try {
      const resp = await fetchCustomFlows(
        activeDateRange.period.since,
        activeDateRange.period.until,
      );

      if (resp.success) {
        const { data } = resp.data;
        set((state) => ({
          automation: {
            ...state.automation,
            all: data.all,
            overall: data.overall,
            all_shopify_flows: data.all_shopify_flows,
          },
          flowsPageLoading: false,
        }));
      } else {
        set({ flowsPageLoading: false });
      }
    } catch (error) {
      console.error("Failed to get custom flows", error);
      set({ flowsPageLoading: false });
    }
  },

  handleResetFlows: (type) => {
    const {
      handleEdgesChange,
      handleNodesChange,
      handleSelectedNodeChange,
      handleNodeOptionsChange,
      nodeOptions,
    } = get();

    handleEdgesChange(initialEdges);
    handleNodesChange([
      {
        id: "1",
        position: { x: 0, y: 0 },
        data: {
          triggerType: type,
        },
        type: "triggerNode",
        style: {
          ...flowsNodeStyles,
          backgroundColor: "#fff",
        },
      },
      {
        id: "2",
        position: { x: 400, y: 0 },
        type: "addBtnNode",
        data: {
          id: "2",
        },
        style: {
          backgroundColor: "transparent",
          padding: "0",
          border: "none",
          boxShadow: "0 0 10px rgba(53, 66, 84, .1)",
          width: "300px",
          height: 50,
        },
      },
    ]);
    handleSelectedNodeChange({
      type: "",
      id: "",
      options: {},
    });
    handleNodeOptionsChange({
      ...nodeOptions,
      lastId: "1",
      nextId: 3,
      counts: {
        emailNode: 0,
      },
      type: "",
      isCreatingFlow: true,
      isTriggerAdded: type === "custom" ? false : true,
      flowId: ulid(),
    });
    if (type === "custom") {
      set({
        flowTypeData: {
          flow: null,
          overall: {},
        },
      });
    }
  },

  getFlowByType: async (type) => {
    try {
      const resp = await fetchFlowByType(type);
      const { flow, overall } = resp.data;
      set({
        flowTypeData: {
          flow: flow,
          overall: overall,
        },
      });

      // If flow has nodes and edges, update the store to render them
      if (flow && flow.nodes && flow.edges) {
        // Ensure nodes and edges are arrays (handling potential API inconsistencies)
        const nodes = Array.isArray(flow.nodes)
          ? flow.nodes
          : Object.values(flow.nodes || {});
        const edges = Array.isArray(flow.edges)
          ? flow.edges
          : Object.values(flow.edges || {});

        if (nodes.length > 0) {
          set({ nodes, edges });
        }
      }

      return flow;
    } catch (error) {
      console.error("Failed to get flow by type", error);
      return null;
    }
  },

  getAllAutomation: async (activeDateRange) => {
    set({ flowsPageLoading: true });
    try {
      const resp = await fetchAllAutomation(
        activeDateRange.period.since,
        activeDateRange.period.until,
      );
      if (resp.success) {
        const { data } = resp.data;
        const backendTypes = (data.all || []).reduce((acc: any, flow: any) => {
          if (flow.type) acc[flow.type] = true;
          return acc;
        }, {});

        set((state) => ({
          automation: {
            ...state.automation,
            all: data.all,
            overall: data.overall,
            all_shopify_flows: data.all_shopify_flows,
            backendTypes,
          },
          flowsPageLoading: false,
        }));
      } else {
        set({ flowsPageLoading: false });
      }
    } catch (error) {
      console.error("Failed to get all automation", error);
      set({ flowsPageLoading: false });
    }
  },

  getFlowData: async (flowId) => {
    try {
      const resp = await fetchFlowData(flowId);
      if (resp.success) {
        const data = resp.data; // Assuming data is the flow object or contains it
        // dump.md: const { title... } = data; (assuming data is flat or data.flow)
        // If API returns { success: true, data: { ...flowProps } }

        set((state) => ({
          flowData: {
            ...state.flowData,
            title: data.title,
            message: data.message,
            previewText: data.preview_text,
            templateHtml: data.template_html,
            templateJson: data.template_json,
            templateName: data.template_name,
            templateImage: data.template_image,
            discountCode: data.discount_code,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to get flow data", error);
    }
  },

  createFlow: async (data) => {
    try {
      const res = await createFlow(data);
      return res;
    } catch (error) {
      console.error("Failed to create flow", error);
      throw error;
    }
  },

  updateFlow: async (id, data) => {
    try {
      const res = await updateFlow(id, data);
      return res;
    } catch (error) {
      console.error("Failed to update flow", error);
      throw error;
    }
  },

  getDefaultFlowTemplate: async (type) => {
    try {
      const resp = await fetchDefaultFlowTemplate(type);
      const { flow, overall } = resp.data;
      set({
        flowTypeData: {
          flow: flow,
          overall: overall,
        },
      });

      if (flow && flow.nodes && flow.edges) {
        const nodes = Array.isArray(flow.nodes)
          ? flow.nodes
          : Object.values(flow.nodes || {});
        const edges = Array.isArray(flow.edges)
          ? flow.edges
          : Object.values(flow.edges || {});

        if (nodes.length > 0) {
          set({ nodes, edges });
        }
      }
      return flow;
    } catch (error) {
      console.error("Failed to get default flow template", error);
      return null;
    }
  },
}));
