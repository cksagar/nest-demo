import { existsSync, mkdirSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';

const execPromise = promisify(exec);

@Injectable()
export class UploadService {
  async convertPdfToHtml(pdfPath: string, fileName: string): Promise<string> {
    const htmlFileName = fileName.replace(/\.pdf$/, '.html');

    // Ensure the converted/ folder exists
    const convertedDir = join(process.cwd(), 'converted');
    if (!existsSync(convertedDir)) {
      mkdirSync(convertedDir, { recursive: true });
    }

    // Convert PDF path to WSL-compatible format
    const wslPdfPath = pdfPath
      .replace(/^([A-Z]):\\/, '/mnt/$1/')
      .replace(/\\/g, '/')
      .toLowerCase();

    // Hardcoded WSL path to converted directory (must match host location)
    const wslOutputDir = '/mnt/d/office/practice/nest-demo/converted'; // <-- Adjust path if needed

    // Log paths for debugging
    console.log('Input PDF Path (WSL):', wslPdfPath);
    console.log('Output Dir (WSL):', wslOutputDir);

    // Correct command: only use input + --dest-dir flag
    const command = `wsl ./pdf2htmlEX-7c9086b.AppImage "${wslPdfPath}" --dest-dir "${wslOutputDir}"`;

    try {
      await execPromise(command);
      return `/converted/${htmlFileName}`; // Frontend can use this path
    } catch (error) {
      console.error('PDF to HTML conversion failed:', error);
      throw new Error('Conversion failed');
    }
  }
}
