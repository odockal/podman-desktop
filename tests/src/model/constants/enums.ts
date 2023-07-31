export enum ContainerState {
    Starting = 'STARTING',
    Stopping = 'STOPPING',
    Running = 'RUNNING',
    Error = 'ERROR',
    Exited = 'EXITED',
    Deleting = 'DELETING',
    Created = 'CREATED',
    Unknown = 'UNKNOWN',
}