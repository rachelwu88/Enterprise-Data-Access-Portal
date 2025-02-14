package com.maxxenergy.Backend;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

import java.util.Properties;

public class SshTunnelManager {
    private Session session;

    public void openTunnel(String sshHost, int sshPort, String sshUser, String sshPassword,
                           String remoteHost, int remotePort, int localPort) throws Exception {
        JSch jsch = new JSch();
        session = jsch.getSession(sshUser, sshHost, sshPort);
        session.setPassword(sshPassword);

        Properties config = new Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);

        session.connect(); // Connect to SSH server
        session.setPortForwardingL(localPort, remoteHost, remotePort);
    }

    public void closeTunnel() {
        if (session != null && session.isConnected()) {
            session.disconnect();
        }
    }
}