export interface FlowData {
  title: string;
  message: string;
  previewText: string;
  templateName: string;
  templateJson: Record<string, any>;
  templateHtml: Record<string, any>;
  templateImage: string;
  discountCode: string;
}

export interface NodeOptions {
  lastId: string;
  nextId: number;
  counts: Record<string, number>;
  type: string;
  isBtnModalOpen: boolean;
  isCreatingFlow: boolean;
  flowId: string;
  newEmailNodes: any[];
  isTriggerAdded: boolean;
}

export interface FlowState {
  // State
  flowData: FlowData;
  nodes: any[];
  edges: any[];
  flowTypeData: {
    overall: Record<string, any>;
    flow: any;
  };
  nodeOptions: NodeOptions;
  selectedNode: {
    type: string;
    id: string;
    options: Record<string, any>;
  };
  flowsPageLoading: boolean;
  automation: {
    all: any[];
    overall: any[];
    shopSettings: any[];
    all_shopify_flows: any[];
    backendTypes: Record<string, boolean>;
  };
  activeModal: string | null;

  // Actions
  setFlowData: (
    data: Partial<FlowData> | ((prev: FlowData) => Partial<FlowData>),
  ) => void;
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
  setFlowTypeData: (data: any) => void;
  setNodeOptions: (data: any) => void;
  setSelectedNode: (data: any) => void;
  setFlowsPageLoading: (loading: boolean) => void;
  setAutomation: (data: any) => void;
  setActiveModal: (modal: string | null) => void;

  handleEdgesChange: (payload: any) => void;
  handleNodesChange: (payload: any) => void;
  handleNodeOptionsChange: (payload: any) => void;
  handleSelectedNodeChange: (payload: any) => void;
  handleChangeFlowData: (newValue: any, name: string) => void;

  getCustomFlows: (activeDateRange: {
    period: { since: string; until: string };
  }) => Promise<void>;
  handleResetFlows: (type: string) => void;
  getFlowByType: (type: string) => Promise<any>;
  getAllAutomation: (activeDateRange: {
    period: { since: string; until: string };
  }) => Promise<void>;
  getFlowData: (flowId: string) => Promise<void>;
  createFlow: (data: any) => Promise<any>;
  updateFlow: (id: string, data: any) => Promise<any>;
  getDefaultFlowTemplate: (type: string) => Promise<any>;
}
