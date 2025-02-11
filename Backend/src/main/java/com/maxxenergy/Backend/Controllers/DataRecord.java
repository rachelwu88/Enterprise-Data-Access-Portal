package com.maxxenergy.Backend;

public class DataRecord {
    private String timestamp;
    private String powerOutput;
    private String efficiency;

    public DataRecord(String timestamp, String powerOutput, String efficiency) {
        this.timestamp = timestamp;
        this.powerOutput = powerOutput;
        this.efficiency = efficiency;
    }

    public String toJson() {
        return String.format(
                "{\"timestamp\":\"%s\",\"powerOutput\":\"%s\",\"efficiency\":\"%s\"}",
                timestamp, powerOutput, efficiency
        );
    }

    public String[] toCsvRow() {
        return new String[]{timestamp, powerOutput, efficiency};
    }
}