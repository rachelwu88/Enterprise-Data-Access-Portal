package com.maxxenergy.Backend.Connections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SshTunnelConfig {

    @Value("${ssh.host}")
    private String sshHost;

    @Value("${ssh.port}")
    private int sshPort;

    @Value("${ssh.user}")
    private String sshUser;

    @Value("${ssh.password}")
    private String sshPassword;

    @Value("${remote.db.host}")
    private String remoteDbHost;

    @Value("${remote.db.port}")
    private int remoteDbPort;

    @Value("${local.db.port}")
    private int localDbPort;

    @Bean
    public SshTunnelManager sshTunnelManager() throws Exception {
        SshTunnelManager tunnelManager = new SshTunnelManager();
        tunnelManager.openTunnel(sshHost, sshPort, sshUser, sshPassword, remoteDbHost, remoteDbPort, localDbPort);
        return tunnelManager;
    }
}