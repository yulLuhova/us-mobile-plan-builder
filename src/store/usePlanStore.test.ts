import { usePlanStore, LOCAL_STORAGE_KEY } from "./usePlanStore";

describe("usePlanStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default plan if no saved settings", () => {
    const state = usePlanStore.getState();
    expect(state.data).toBe("5GB");
    expect(state.talk).toBe("none");
    expect(state.text).toBe("none");
  });

  it("updates state when setters are called", () => {
    const store = usePlanStore.getState();
    store.setData("10GB");
    store.setTalk("100_mins");
    store.setText("500_texts");

    const newState = usePlanStore.getState();
    expect(newState.data).toBe("10GB");
    expect(newState.talk).toBe("100_mins");
    expect(newState.text).toBe("500_texts");
  });

  it("saves settings to localStorage", () => {
    const store = usePlanStore.getState();
    store.setData("15GB");
    store.setTalk("Unlimited");
    store.setText("Unlimited");
    store.saveSettings();

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved!);
    expect(parsed.data).toBe("15GB");
    expect(parsed.talk).toBe("Unlimited");
    expect(parsed.text).toBe("Unlimited");
  });

  it("resets settings and clears localStorage", () => {
    const store = usePlanStore.getState();
    store.setData("15GB");
    store.setTalk("Unlimited");
    store.setText("Unlimited");
    store.saveSettings();

    store.resetSettings();
    const newState = usePlanStore.getState();
    expect(newState.data).toBe("5GB");
    expect(newState.talk).toBe("none");
    expect(newState.text).toBe("none");
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull();
  });
});
