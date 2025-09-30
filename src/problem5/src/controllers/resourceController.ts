import { Request, Response } from 'express';
import * as resourceService from '../services/resourceService';

export const createResource = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    const newResource = await resourceService.createResource(name, description);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getResources = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    const resources = await resourceService.findResources(name as string);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getResourceById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const resource = await resourceService.findResourceById(id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    const updatedResource = await resourceService.updateResourceById(id, name, description);
    if (!updatedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await resourceService.deleteResourceById(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
